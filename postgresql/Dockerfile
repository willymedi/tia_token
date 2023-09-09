FROM postgres:latest

ENV POSTGRES_USER postgres
ENV POSTGRES_PASSWORD postgres
ENV POSTGRES_DB tia
RUN ln -sf /usr/share/zoneinfo/America/Guayaquil /etc/localtime
COPY init.sql /docker-entrypoint-initdb.d/
EXPOSE 5433