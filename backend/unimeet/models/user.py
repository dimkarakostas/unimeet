# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import models
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.base_user import AbstractBaseUser
from .managers import UserManager


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(
        unique=True,
        help_text=("The user's academic email.")
    )

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    class Meta:
        verbose_name = 'user'
        verbose_name_plural = 'users'

    date_joined = models.DateTimeField(
        auto_now_add=True,
        help_text=("The date the user joined")
    )

    is_active = models.BooleanField(
        default=True,
        help_text=("The user active state")
    )

    MALE = -1
    UNDEFINED = 0
    FEMALE = 1
    GENDER_CHOICES = (
        (MALE, 'Male'),
        (UNDEFINED, 'Undefined'),
        (FEMALE, 'Female')
    )

    school = models.ForeignKey('unimeet.School')

    gender = models.IntegerField(
        default=0,
        choices=GENDER_CHOICES,
        help_text=("The user's gender, by default UNDEFINED, unless otherwise "
                   "explicitly specified by the user.")
    )

    interestedInGender = models.IntegerField(
        default=0,
        choices=GENDER_CHOICES,
        help_text=("The gender that the user is interested in talking to, by "
                   "default UNDEFINED.")
    )

    interestedInSchools = models.ManyToManyField('unimeet.School', related_name='user_interested_schools')

    token = models.CharField(
        default='',
        max_length=40,
        db_index=True,
        help_text=("The user's authentication token for unimeet")
    )

    welcomeToken = models.CharField(
        default='',
        max_length=255,
        db_index=True,
        help_text=('The one-time authentication token used in welcome link.')
    )

    registrationIP = models.GenericIPAddressField(
        default='127.0.0.1',
        db_index=True,
        help_text=('The IP that the user used for registration.')
    )
