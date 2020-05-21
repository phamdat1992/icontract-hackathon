To build and run back-end:

git clone https://github.com/phamdat1992/icontract-hackathon.git

cd icontract-hackathon/back-end/php

docker build --build-arg MYSQL_HOST=wh-tools-live.cluster-cc1zmkl8ljww.ap-southeast-1.rds.amazonaws.com --build-arg MYSQL_USERNAME=refund_form_id --build-arg MYSQL_PASSWORD=daTfdzmb6fdcubc --build-arg ENCRYPTION_KEY=Z3mNToNMOusuVjReZZUUQXuSsLQzIZlq --build-arg EMAIL_USERNAME=backend@my.zalora.com --build-arg EMAIL_PASSWORD=ywQ5wDhR --build-arg AWS_REGION=ap-southeast-1 --build-arg AWS_BUCKET=refund-form-id-images --build-arg AWS_VERSION=latest --build-arg AWS_KEY=AKIAYSJ3QU2U543UIVJO --build-arg AWS_SECCRET=DExFsYXs3YJZNBZDk4Q7Ov20tPxwR0qJtUmSxbEI --build-arg RECAPTCHA_SITE_KEY=6LdGC3AUAAAAAF9RjRxGFRN0uBEy5tH_t8YsCuZI --build-arg RECAPTCHA_SECRET_KEY=6LdGC3AUAAAAAJ8OuyYmfN6W-429-ho3F8naEppL -t icontract-hackathon .

docker run -p 1234:80 -v <project_path>:/var/www/html/ icontract-hackathon

access http://localhost:1234/ from browser.
