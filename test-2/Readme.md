
## Install

- Clone this repository by typing it in the console or terminal
-   type in console or terminal  `npm i`  or  `npm install`
- First is **Important** copy or rename file **.env copy** to **.env** and configuration your database :
 DATABASE_URL=mysql://**root**:**password**@localhost:3306/**name_database**
    
- setup prisma schema in  **schema.prisma**  file
- after setup type in console or terminal  `npx prisma migrate dev`  and generate prisma client by type  `npx prisma generate`
- run in console by type `npm run dev` for running server by local

## Analisis dan Solusi

1.  Persentase jumlah pelanggan yang registrasi dan pelanggan yang melakukan pesanan:
    
    -   Diperlukan informasi tentang jumlah pelanggan yang telah melakukan registrasi dan jumlah pelanggan yang juga melakukan pesanan.
    -   Persentase dapat dihitung dengan membagi jumlah pelanggan yang melakukan pesanan dengan jumlah pelanggan yang melakukan registrasi.
2.  Persebaran lokasi (kota) pelanggan yang melakukan pesanan:
    
    -   Diperlukan data lokasi pelanggan yang melakukan pesanan, termasuk nama kota.
    -   Diperlukan informasi jumlah pelanggan di setiap kota yang melakukan pesanan.
    -   Diperlukan informasi kuantitas pesanan yang dilakukan oleh pelanggan di setiap kota.
3.  Ranking pelanggan yang paling besar kuantitas pemesanannya:
    
    -   Diperlukan data pelanggan yang telah melakukan pesanan.
    -   Diperlukan informasi kuantitas pesanan yang dilakukan oleh setiap pelanggan.
    -   Perlu dilakukan perangkingan berdasarkan kuantitas pemesanan dari yang terbesar hingga terkecil.
4.  Ranking produk yang paling banyak dipesan:
    
    -   Diperlukan data pesanan yang mencakup produk yang dipesan.
    -   Diperlukan informasi jumlah pesanan yang diterima oleh setiap produk.
    -   Perlu dilakukan perangkingan produk berdasarkan jumlah pesanan dari yang terbanyak hingga terendah.
5.  Ranking pelanggan yang paling besar rata-rata pembeliannya:
    
    -   Diperlukan data pelanggan yang telah melakukan pesanan.
    -   Diperlukan informasi total pembelian yang dilakukan oleh setiap pelanggan.
    -   Perlu dilakukan perangkingan berdasarkan rata-rata pembelian dari yang terbesar hingga terkecil.
6.  Jumlah pemasukan:
    -   Diperlukan data pesanan yang mencakup informasi harga produk dan jumlah pesanan.
    -   Diperlukan perhitungan total pemasukan berdasarkan harga produk dan jumlah pesanan.

## Documentation API

Overview :

- export file postman di folder postman pada program ini
- endpoint dibedakan berdasarkan prefix yaitu **customers, products, orders,** dan **locations**

### Customers

#### **Get Customers**
Ambil semua Data Customer beserta relasinya :

    http://localhost:8080/api/users

  #### **Get Customer**
 Ambil spesifik data customer berdasarkan id
 param :
 - id: integer
 
      http://localhost:8080/api/user/id
 
 #### Get Percentage Customer
 Mengembalikan persentase jumlah pelanggan yang telah melakukan registrasi dan jumlah pelanggan yang juga melakukan pesanan.
 
params:
id: integer

    http://localhost:8080/api/customers/percentage/1

#### Get Top Customers by Order Quantity
Mengembalikan daftar pelanggan berdasarkan peringkat jumlah pemesanan mereka dari yang terbesar hingga terkecil.

Query:
limit = integer (max 5)

    http://localhost:8080/api/customers/top/order-quantity?limit=5

#### Get Top Customer By Avarage Purchase
Mengembalikan daftar pelanggan berdasarkan peringkat rata-rata pembelian dari yang terbesar hingga terkecil.

    http://localhost:8080/api/customers/top/average-purchase

####  **Add Customer**   
  tambah data customer :
  
   input type :
   - name : string
   
    http://localhost:8080/api/users/add

####  **Update Customer**

   update data customer dengan id
   
   param :
   - id : integer
   
   input type :
   - name : string
   
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
   - price: integer
   
    http://localhost:8080/api/products/add

####  **Delete Product**
param :
- id : integer

http://localhost:8080/api/products/delete/id

### Orders

####  **Get Orders**
ambil semua data pesanan

    http://localhost:8080/api/orders/orders

#### Get Top Order Product
Mengembalikan daftar produk berdasarkan peringkat jumlah pesanan dari yang terbanyak hingga terendah.

    http://localhost:8080/api/orders/top/products

#### Get Total Revenue
Mengembalikan jumlah total pemasukan dari pesanan yang dilakukan.

    http://localhost:8080/api/orders/total-revenue

####  **Create Order**
enpoint ini untuk memesan produk

input :
- customer_id: integer
- product_id: integer
- location_id: integer
- quantity: integer

note:
customer_id: **id customer** pastikan input id customer ada datanya di tabel **customers**
product_id: **id product** pastikan input id product ada datanya di tabel **products**
location_id: id location astikan input id product ada datanya di tabel **locations**
quantity: adalah quantitas order dan pastikan inputnya integer

    http://localhost:8080/api/orders/add

#### Update Order
Mengupdate informasi pesanan yang ada dalam database, seperti kuantitas.

Params :
id: integer

input :
- customer_id: integer
- product_id: integer
- location_id: integer
- quantity: integer

note:
customer_id: **id customer** pastikan input id customer ada datanya di tabel **customers**
product_id: **id product** pastikan input id product ada datanya di tabel **products**
location_id: id location astikan input id product ada datanya di tabel **locations**
quantity: adalah quantitas order dan pastikan inputnya integer

    http://localhost:8080/api/orders/update/id

#### Delete Order
Menghapus entri pesanan dari database.

Params:
id: integer

    http://localhost:8080/api/orders/delete/id

### Locations

#### Get Locations
Ambil semua data persebaran lokasi

    http://localhost:8080/api/locations

#### Add Location
membuat entri untuk persebaran lokasi untuk pelanggan

input :
city_name: string

    http://localhost:8080/api/locations/add