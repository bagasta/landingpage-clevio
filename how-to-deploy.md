# Panduan Deploy Next.js Landing Page ke VPS

Dokumen ini menjelaskan langkah demi langkah untuk melakukan deployment proyek Next.js/Node.js ke server VPS (misalnya VPS Hostinger, DigitalOcean, dll.). Seluruh instruksi menggunakan distro Linux berbasis Debian/Ubuntu. Sesuaikan jika Anda memakai distro lain.

---

## 1. Prasyarat

1. **Akses root atau sudo** ke VPS.
2. **Domain** yang mengarah ke IP VPS (opsional, tetapi dianjurkan).
3. **Server bersih** dengan Ubuntu 22.04 atau setara.
4. **Kode aplikasi** tersedia di Git repository (GitHub/GitLab) atau siap di-upload manual.

---

## 2. Persiapan Server

1. **Login ke VPS**
   ```bash
   ssh username@IP_VPS
   ```
2. **Perbarui paket sistem**
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```
3. **Instalasi utilitas dasar**
   ```bash
   sudo apt install -y build-essential curl git ufw
   ```
4. **Aktifkan firewall dasar (opsional tapi disarankan)**
   ```bash
   sudo ufw allow OpenSSH
   sudo ufw enable
   sudo ufw status
   ```

---

## 3. Instal Node.js & PM2

1. **Instal Node.js LTS (>= 18) melalui NodeSource**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
   sudo apt install -y nodejs
   node -v
   npm -v
   ```
2. **Instal PM2 global** (process manager untuk Node.js)
   ```bash
   sudo npm install -g pm2
   pm2 -v
   ```

---

## 4. Kloning Proyek & Konfigurasi Lingkungan

1. **Pilih direktori kerja**
   ```bash
   mkdir -p ~/apps
   cd ~/apps
   ```
2. **Kloning repository**
   ```bash
   git clone https://github.com/USERNAME/landing-page-clevio.git
   cd landing-page-clevio
   ```
   > Jika tidak memakai Git, upload file ZIP ke server lalu ekstrak di folder ini.

3. **Salin file environment**
   - Buat file `.env.production` atau `.env` sesuai kebutuhan.
   - Contoh:
     ```bash
     cp .env.example .env
     nano .env
     ```
   - Isi variabel (DB_URL, NEXTAUTH_SECRET, dsb.) sesuai data produksi.

4. **Instal dependencies**
   ```bash
   npm install
   ```

---

## 5. Build & Jalankan Aplikasi

1. **Build produksi**
   ```bash
   npm run build
   ```
2. **Jalankan aplikasi dengan Next.js server**
   ```bash
   npm run start
   ```
   - Hentikan dengan `Ctrl + C` setelah memastikan berjalan, karena kita akan memakai PM2.
3. **Daftarkan aplikasi ke PM2**
   ```bash
   pm2 start npm --name landing-page-clevio -- run start
   pm2 status
   ```
4. **Set PM2 agar otomatis start saat boot**
   ```bash
   pm2 startup systemd
   # Ikuti instruksi yang muncul, biasanya:
   sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u $USER --hp /home/$USER
   pm2 save
   ```

---

## 6. Konfigurasi Reverse Proxy (Nginx)

1. **Instal Nginx**
   ```bash
   sudo apt install -y nginx
   ```
2. **Buka port HTTP/HTTPS**
   ```bash
   sudo ufw allow 'Nginx Full'
   sudo ufw status
   ```
3. **Buat file konfigurasi Nginx**
   ```bash
   sudo nano /etc/nginx/sites-available/landing-page-clevio
   ```
   Isi contoh konfigurasi:
   ```nginx
   server {
       listen 80;
       server_name contoh-domain.com www.contoh-domain.com;

       location / {
           proxy_pass http://127.0.0.1:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```
4. **Aktifkan site & cek konfigurasi**
   ```bash
   sudo ln -s /etc/nginx/sites-available/landing-page-clevio /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```

---

## 7. SSL (Opsional tapi disarankan)

1. **Instal Certbot**
   ```bash
   sudo apt install -y certbot python3-certbot-nginx
   ```
2. **Dapatkan sertifikat SSL**
   ```bash
   sudo certbot --nginx -d contoh-domain.com -d www.contoh-domain.com
   ```
3. **Tes pembaruan otomatis**
   ```bash
   sudo certbot renew --dry-run
   ```

---

## 8. Pengelolaan Database (Jika Memakai Prisma)

1. **Set environment database** di `.env`.
2. **Jalankan migrasi**
   ```bash
   npx prisma migrate deploy
   ```
3. **Seed data awal (opsional)**
   ```bash
   npx ts-node prisma/seed.ts
   ```

---

## 9. Monitoring & Logging

1. **Lihat log aplikasi**
   ```bash
   pm2 logs landing-page-clevio
   ```
2. **Restart/Stop aplikasi**
   ```bash
   pm2 restart landing-page-clevio
   pm2 stop landing-page-clevio
   ```

---

## 10. Otomatisasi Deployment (Opsional)

1. **Gunakan Git hook atau CI/CD** (GitHub Actions, GitLab CI) untuk auto-deploy ke VPS.
2. **Contoh sederhana pull otomatis**
   ```bash
   git pull
   npm install
   npm run build
   pm2 restart landing-page-clevio
   ```

---

## 11. Checklist Pasca-Deploy

1. Situs tersedia di `https://contoh-domain.com`.
2. Semua halaman penting memuat dengan benar.
3. API endpoint (mis. `/api/health`) mengembalikan respons yang diharapkan.
4. PM2 menunjukkan status `online`.
5. Sertifikat SSL valid.

---

## 12. Troubleshooting Singkat

- **Port 3000 tidak terbuka:** pastikan aplikasi berjalan (`pm2 status`) dan tidak ada firewall internal yang menutup.
- **Perubahan kode tidak muncul:** jalankan `git pull`, `npm run build`, lalu `pm2 restart`.
- **Error Prisma database:** cek koneksi database dan jalankan `npx prisma migrate deploy`.
- **403/404 setelah config Nginx:** pastikan `proxy_pass` mengarah ke port yang benar dan Nginx sudah di-reload.

---

Selamat! Aplikasi Next.js Anda kini siap melayani pengguna dari VPS. Gunakan panduan ini sebagai referensi utama setiap kali melakukan deployment baru atau pemeliharaan rutin. Semoga sukses!

