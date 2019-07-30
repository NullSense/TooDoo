# pull official base image
FROM python:3.7.4-alpine3.9

COPY ./backend /backend

WORKDIR /backend

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install dependencies
RUN pip install --upgrade pip
RUN pip install virtualenv
RUN \
        apk add --no-cache postgresql-libs && \
        apk add --no-cache --virtual .build-deps gcc musl-dev postgresql-dev && \
        pip install -r requirements-prod.txt --no-cache-dir && \
        apk --purge del .build-deps

CMD python manage.py collectstatic --no-input && python manage.py makemigrations && python manage.py migrate && gunicorn backend.wsgi -b 0.0.0.0:8000
