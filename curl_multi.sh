nohup curl http://localhost:3000/sequelize/large_data/insert?request_id=1 > /tmp/nohup.log 2> /tmp/nohup.error.log &
nohup curl http://localhost:3000/sequelize/large_data/insert?request_id=2 > /tmp/nohup.log 2> /tmp/nohup.error.log &
nohup curl http://localhost:3000/sequelize/large_data/insert?request_id=3 > /tmp/nohup.log 2> /tmp/nohup.error.log &
nohup curl http://localhost:3000/sequelize/large_data/insert?request_id=4 > /tmp/nohup.log 2> /tmp/nohup.error.log &
nohup curl http://localhost:3000/sequelize/large_data/insert?request_id=5 > /tmp/nohup.log 2> /tmp/nohup.error.log &
