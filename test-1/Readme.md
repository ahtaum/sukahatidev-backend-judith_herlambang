
## Install

- Clone this repository by typing it in the console or terminal
-   type in console or terminal  `npm i`  or  `npm install`
- First is **Important** copy or rename file **.env copy** to **.env** and configuration your database :

 DATABASE_URL=mysql://**root**:**password**@localhost:3306/**name_database**
    
- setup prisma schema in  **schema.prisma**  file
- after setup type in console or terminal  `npx prisma generate`  and generate prisma client by type  `npx prisma migrate dev`
- run in console by type `npm run dev` for running server by local

## Analisis dan Solusi

Analisis kebutuhan dari tim marketing :
1.  Tim marketing membutuhkan rekaman data pelanggan yang meliputi identitas pelanggan dan pesanan yang dilakukan.
2.  Identitas pelanggan mencakup informasi seperti nama brand, kota, nomor telepon, kebutuhan produk, dan rata-rata kuantitas kebutuhan produk.
3.  Pesanan pelanggan mencakup informasi seperti nama brand, nama produk, klasifikasi produk, harga, kuantitas produk, status pembayaran, dan tanggal pesanan.
4.  Terdapat tabel produk yang berisi informasi tentang nama produk, klasifikasi produk, tipe, satuan, konstanta pengali, dan harga per kilogram.
5.  Terdapat beberapa fakta seperti pelanggan dapat memiliki brand dengan cabang lebih dari satu, hanya pelanggan yang sudah mendaftar yang dapat melakukan pemesanan, pesanan dapat dibatalkan namun tetap terdata, harga total produk dihitung setelah dikonversi ke kilogram, dan nama produk dan klasifikasi produk mengikuti daftar yang ditentukan.

Solusi yang diajukan :
1.  Buatlah entitas database untuk menyimpan data pelanggan dan pesanan. Entitas pelanggan akan memiliki atribut seperti nama, kota, nomor telepon. Entitas pesanan akan memiliki atribut seperti id pemesan dan id produk yang dipesan dan tanggal pemesanan. Hubungan antara pelanggan dan pesanan adalah one-to-many, dimana satu pelanggan dapat memiliki banyak pesanan.
2.  Gunakan validasi pada proses pendaftaran pelanggan untuk memastikan data yang diinput valid dan lengkap.
3.  Saat pelanggan melakukan pemesanan, verifikasi terlebih dahulu apakah pelanggan sudah terdaftar atau belum sebelum memproses pesanan. Jika pelanggan belum terdaftar, tampilkan pesan error.
4.  Ketika pesanan dibatalkan, perbarui status pesanandengan menghapus data pesanan pada entitas pesanan.

## Documentation API

Overview :

- export file postman di folder postman pada program ini
- endpoint dibedakan berdasarkan prefik yaitu **customers, products,** dan **main**

### Customers

#### **Get Customers**
Ambil semua Data Customer beserta relasinya :

    http://localhost:8080/api/users

  #### **Get Customer**
 Ambil spesifik data customer berdasarkan id
 param :
 - id: integer
 
      http://localhost:8080/api/user/id


####  **Add Customer**   
  tambah data customer :
  
   input type :
   - name : string
   - city : string
   - phone: integer
   
    http://localhost:8080/api/users/add

####  **Update Customer**

   update data customer dengan id
   
   param :
   - id : integer
   
   input type :
   - name : string
   - city : string
   - phone: integer
   
    http://localhost:8080/api/users/update/id

####  **Delete Customer**
param :
- id : integer

http://localhost:8080/api/users/delete/2


### Products

####  **Get Products**
Ambil semua Data products beserta relasinya :

    http://localhost:8080/api/products

 ####  **Get Product**
 Ambil spesifik data products berdasarkan id
 param :
 - id: integer
 
      http://localhost:8080/api/products/id


####  **Add Products**   
  tambah data product :
  
   input type :
   - name : string
   - classification: string
   - type: string
   
    http://localhost:8080/api/products/add

####  **Update Product**

   update data product dengan id
   
   param :
   - id : integer
   
   input type :
   - name : string
   - classification: string
   - type: string
   
    http://localhost:8080/api/products/update/id

####  **Delete Product**
param :
- id : integer

http://localhost:8080/api/products/delete/2

### Main

####  **Get Orders**
ambil semua data pesanan

    http://localhost:8080/api/main/orders
  
####  **Get Order**
ambil data pesanan berdasarkan **id customer** jadi pastikan id customer nya benar

params :
- id: integer

    http://localhost:8080/api/main/orders/customer/id

 
####  **Add Brand**
enpoint ini untuk menambahkan brand untuk kebutuhan customer atau pelanggan

input :
- name: string
- name_customer

note :
- name : adalah nama produk yang ingin diinput
- name_customer: adalah **nama customer yang terdaftar di database customer** jadi pastikan diinput dengan benar

    http://localhost:8080/api/main/add/brand

####  **Create Order**
enpoint ini untuk memesan produk

input :
- customerId: integer
- productId: integer

note:
- customerId: **id customer** jadi pastikan input id customer ada datanya di tabel **customers**
- productId: **id product** jadi pasrikan input id product ada datanya di tabel **products**

    http://localhost:8080/api/main/add/order
 
 ####  **Cancel Order**
 cancel data yang di pesan, endpoint ini akan mendelete data order berdasarkan **id order**

param:
- id: integer

    http://localhost:8080/api/main/cancel/order/id



