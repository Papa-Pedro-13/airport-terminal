wget http://ftp.debian.org/debian/pool/main/d/dpkg/dpkg_1.21.1.tar.xz
tar -xf dpkg_1.21.1.tar.xz
cd dpkg-1.21.1

./configure --prefix=/usr
make
make install
cd ..

wget http://ftp.debian.org/debian/pool/main/a/apt/apt_2.4.5.tar.xz
tar -xf apt_2.4.5.tar.xz
cd apt-2.4.5

./configure --prefix=/usr
make
make install