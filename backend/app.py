from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
import psycopg2

app = Flask(__name__)
CORS(app)

# Define the path to the songs directory
SONGS_DIR = os.path.join(os.path.dirname(__file__), 'songs')

# Establish a connection to PostgreSQL
conn = psycopg2.connect(
    host='localhost',
    user='taariqelliott',
    password='',
    database='riqify'
)

# Create a cursor object to execute SQL queries
cursor = conn.cursor()

# Create the songs table if it doesn't exist
create_table_query = '''
CREATE TABLE IF NOT EXISTS songs (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    artist VARCHAR(255) NOT NULL,
    filename VARCHAR(255) NOT NULL
);
'''
cursor.execute(create_table_query)
conn.commit()

def fetch_songs():
    # Retrieve the songs from the songs table
    select_query = '''
    SELECT id, name, artist, filename FROM songs;
    '''
    cursor.execute(select_query)
    songs = cursor.fetchall()

    # Prepare the song information as a list of dictionaries
    songs_list = []
    for song in songs:
        songs_list.append({
            'songId': song[0],
            'name': song[1],
            'artist': song[2],
            'filename': song[3]
        })

    return songs_list

@app.route('/upload-song', methods=['POST'])
def upload_song():
    # Retrieve the uploaded song file
    song_file = request.files['song']

    # Retrieve additional song information
    song_name = request.form.get('name')
    artist_name = request.form.get('artist')

    # Create a secure filename for the uploaded song
    filename = secure_filename(song_file.filename)

    # Define the path to store the song file
    song_path = os.path.join(SONGS_DIR, filename)

    # Save the song file
    song_file.save(song_path)

    # Insert the song information into the songs table
    insert_query = '''
    INSERT INTO songs (name, artist, filename)
    VALUES (%s, %s, %s)
    RETURNING id;
    '''
    cursor.execute(insert_query, (song_name, artist_name, filename))
    song_id = cursor.fetchone()[0]
    conn.commit()

    songs_list = fetch_songs()

    return jsonify({'message': 'Song uploaded successfully', 'songId': song_id, 'songs': songs_list})

@app.route('/songs', methods=['GET'])
def get_songs():
    songs_list = fetch_songs()
    return jsonify(songs_list)

@app.route('/songs/<int:song_id>', methods=['DELETE'])
def delete_song(song_id):
    # Retrieve the song information from the database
    select_query = '''
    SELECT filename FROM songs WHERE id = %s;
    '''
    cursor.execute(select_query, (song_id,))
    song = cursor.fetchone()

    if song:
        filename = song[0]

        # Delete the song from the songs table
        delete_query = '''
        DELETE FROM songs WHERE id = %s;
        '''
        cursor.execute(delete_query, (song_id,))
        conn.commit()

        # Remove the song file from the songs directory
        song_path = os.path.join(SONGS_DIR, filename)
        if os.path.exists(song_path):
            os.remove(song_path)

        songs_list = fetch_songs()

        return jsonify({'message': 'Song deleted successfully', 'songs': songs_list})
    else:
        return jsonify({'message': 'Song not found'})

@app.route('/songs/<path:filename>', methods=['GET'])
def serve_song(filename):
    return send_from_directory(SONGS_DIR, filename)

if __name__ == '__main__':
    app.run()
