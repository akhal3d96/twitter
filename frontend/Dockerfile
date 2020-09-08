FROM node:14.0.0-stretch

RUN apt update &&\
    apt install python-pip -y &&\
    pip install --no-cache-dir supervisor &&\
    rm -rf /var/lib/apt/lists/*

COPY ./supervisor.conf /etc/supervisor.conf
