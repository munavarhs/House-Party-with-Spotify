from datetime import timedelta
from requests import get, post, put
from .models import SpotifyToken
from django.utils import timezone
from .credentials import CLIENT_ID, CLIENT_SECRET

BASE_URL = "https://api.spotify.com/v1/me/"

def get_user_tokens(session_id):
    user_tokens = SpotifyToken.objects.filter(user=session_id)
    if user_tokens.exists():
        return user_tokens[0]
    return None

def update_or_create_user_token(session_id, access_token, token_type, expires_in, refresh_token=None):
    try:
        tokens = get_user_tokens(session_id)
        expiry = timezone.now() + timedelta(seconds=int(expires_in))

        if tokens:
            tokens.access_token = access_token
            tokens.token_type = token_type
            tokens.expires_in = expiry
            if refresh_token:  # Update refresh_token only if it's provided
                tokens.refresh_token = refresh_token
            tokens.save(update_fields=['access_token', 'token_type', 'expires_in', 'refresh_token'])
        else:
            tokens = SpotifyToken(
                user=session_id,
                access_token=access_token,
                refresh_token=refresh_token,
                token_type=token_type,
                expires_in=expiry
            )
            tokens.save()
    except Exception as e:
        print(f"Error updating token: {e}")
        print(f"Debug info - expires_in type: {type(expires_in)}, value: {expires_in}")

def is_spotify_authenticated(session_id):
    tokens = get_user_tokens(session_id)
    if tokens:
        if tokens.expires_in <= timezone.now():
            refresh_spotify_token(session_id)
        return True
    return False

def refresh_spotify_token(session_id):
    tokens = get_user_tokens(session_id)
    if not tokens or not tokens.refresh_token:
        print("No refresh token available.")
        return

    response = post('https://accounts.spotify.com/api/token', data={
        'grant_type': 'refresh_token',
        'refresh_token': tokens.refresh_token,
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET
    }).json()

    access_token = response.get('access_token')
    token_type = response.get('token_type')
    expires_in = response.get('expires_in')

    if access_token and token_type and expires_in:
        update_or_create_user_token(session_id, access_token, token_type, expires_in, tokens.refresh_token)
    else:
        print(f"Error refreshing token: {response}")

def execute_spotify_api_request(session_id, endpoint, post_=False, put_=False):
    tokens = get_user_tokens(session_id)
    if not tokens:
        return {'Error': 'User not authenticated'}

    headers = {
        'Content-Type': 'application/json',
        'Authorization': f"Bearer {tokens.access_token}"
    }

    if post_:
        response = post(BASE_URL + endpoint, headers=headers)
    elif put_:
        response = put(BASE_URL + endpoint, headers=headers)
    else:
        response = get(BASE_URL + endpoint, headers=headers)

    try:
        response.raise_for_status()  # Raise HTTPError for bad responses
        return response.json()
    except Exception as e:
        print(f"Error executing Spotify API request: {e}")
        print(f"Response status code: {response.status_code}")
        print(f"Response content: {response.text}")
        return {'Error': 'Issue with request'}
    
def play_song(session_id):
    return execute_spotify_api_request(session_id, "player/play", put_=True)

def pause_song(session_id):
    return execute_spotify_api_request(session_id, "player/pause", put_=True)

def skip_song(session_id):
    return execute_spotify_api_request(session_id, "player/next", post_=True)