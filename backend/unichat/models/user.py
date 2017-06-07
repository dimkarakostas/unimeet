# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import models


class User(models.Model):
    MALE = -1
    UNDEFINED = 0
    FEMALE = 1
    GENDER_CHOICES = (
        (MALE, 'Male'),
        (UNDEFINED, 'Undefined'),
        (FEMALE, 'Female')
    )

    school = models.ForeignKey('unichat.School')

    email = models.EmailField(
        unique=True,
        help_text=("The user's academic email.")
    )

    password = models.CharField(
        max_length=100,
        help_text=("The user's password.")
    )

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

    interestedInSchools = models.ManyToManyField('unichat.School', related_name='user_interested_schools')

    cookie = models.CharField(
        default='',
        max_length=255,
        db_index=True,
        help_text=("The user's active cookie.")
    )
