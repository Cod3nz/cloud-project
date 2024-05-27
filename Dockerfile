FROM php:apache
RUN docker-php-ext-install mysqli
COPY ./Worldofhiphop /var/www/html/