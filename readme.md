## Cài đặt

Cài mongo server

`git clone https://github.com/alvintran/vpage-client.git`

`cd vpage-client`

`mkdir data`

Chạy lệnh `mongod --dbpath=./data`

Chạy lệnh `npm install`

`node index`

Mở [Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop) lên chạy thử `http://localhost:8080/posts` với phương thức POST để insert dữ liệu mẫu.