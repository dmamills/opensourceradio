ROOT_DIR=/home/mills/projects/radio

echo '### Building client ###'
cd $ROOT_DIR/client
npm run build

echo '### Deleting previous deploy ###'
sudo rm -rf /usr/share/nginx/html/radio/*

echo '### Copying over new build ###'
cd $ROOT_DIR/client/build
sudo cp -r * /usr/share/nginx/html/radio/

echo '### Deleting build files ###'
cd ..
sudo rm -rf build
