start frontend 
npm run dev

start backend
npm start

if you want to add dummy data to the DB run seeders file
"seed": "ts-node src/seeders/seed.ts"   // package.json
run cmd > npm run seed


to generate swagger API Documentaion
run >>>> npm run swagger-gen

test your logs using this route
http://localhost:5000/test-log 
