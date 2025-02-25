wget http://ftp.debian.org/debian/pool/main/d/dpkg/dpkg_1.21.22.tar.xz
tar -xf dpkg_1.21.22.tar.xz
cd dpkg-1.21.22

./configure --prefix=/usr
make
make install
cd ..

wget http://ftp.debian.org/debian/pool/main/a/apt/apt_2.2.4.tar.xz
tar -xf apt_2.2.4.tar.xz
cd apt-2.2.4

./configure --prefix=/usr
make
make install