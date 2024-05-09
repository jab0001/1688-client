HOST="$REMOTE_USER@162.55.55.20x";
ID="~/.ssh/deploy-prod";
npm run build;
scp -i $ID -r ./dist $HOST:flg;
ssh -i $ID -t $HOST "pm2 restart all";