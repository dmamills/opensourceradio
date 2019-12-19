until node index.js; do
    echo "radio-stream-service crashed with exit code $?.  Respawning.." >&2
    sleep 1
done
