
# Room Music Controller

## Project Description

Room Music Controller is a web application that allows a host to create a room for music playback and share the room with guests. Guests can join using a unique room code provided by the host. The application integrates with the Spotify API to allow room-based music control with the following features:

- **Host Permissions:**
  - Only the host can update room settings, such as the number of votes required to skip a song.
  - The host has exclusive permission to skip or play songs at any time.

- **Guest Permissions:**
  - Guests can join a room using the room code.
  - Guests can vote to skip the current song. If the number of votes exceeds the threshold set by the host, the song will be skipped.
  - Guests can leave the room.

The application uses **Django** for backend development, **React** for frontend, session management for user identification, and integrates the Spotify API with Spotify authentication for music playback.

## Features

1. **Room Creation and Joining:**
   - Hosts can create rooms with customizable settings.
   - Guests can join rooms using a unique code.

2. **Spotify Integration:**
   - Music playback from the host's Spotify playlist.
   - Spotify authentication ensures secure access to the Spotify account.

3. **Song Voting System:**
   - Guests can vote to skip songs.
   - The song is skipped if the votes exceed the set threshold.

4. **Session Management:**
   - Ensures that hosts and guests maintain their roles within the room.

5. **Host Controls:**
   - Hosts can play, pause, and skip songs manually.
   - Hosts can update the voting threshold and other settings.

## Future Scope

Potential enhancements include:

- Adjusting playback volume from the app.
- Displaying the entire song queue for the room.
- Allowing guests to add songs to the queue.
- Providing room-wide chat functionality.

## Technologies Used

- **Frontend:** React.js
- **Backend:** Django Framework
- **Authentication:** Spotify API and OAuth
- **Session Management:** Django Sessions

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/munavarhs/House-Party-with-Spotify
   cd room-music-controller
   ```

2. Install backend dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

4. Set up Spotify Developer credentials:
   - Create a Spotify Developer account and register an application.
   - Add your Redirect URI and note down the `Client ID` and `Client Secret`.
   - Add these credentials to your environment variables or Django settings.

5. Run the application:
   ```bash
   # Backend
   python manage.py runserver

   # Frontend
   cd frontend
   npm start
   ```

6. Access the application at `http://localhost:8000`.

## Contribution Guidelines

We welcome contributions! Please:

1. Fork the repository.
2. Create a new branch for your feature/bug fix.
3. Submit a pull request with a detailed description of changes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contact

For questions or feedback, reach out via [munnavar29@gmail.com] or create an issue on GitHub.

