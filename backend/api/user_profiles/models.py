from django.db import models
from authentication.models import User
from django.core.validators import MaxValueValidator, MinValueValidator


class Gender(models.TextChoices):
    MALE = 'male', 'Male'
    FEMALE = 'female', 'Female'


class StudentProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    gender = models.CharField(
        max_length=10,
        choices=Gender.choices,
        default=Gender.MALE
    )
    
    def __str__ (self):
        return self.user.username
    
   
    

# class InstructorType(models.TextChoices):
#     UNDERGRADE = 'undergrade', 'UnderGrade'
#     GRADUATE = 'graduate', 'Graduate'
    
    
# class StudentYear(models.TextChoices):
#     FRESHMENT = 'freshmen', 'Freshmen'
#     SOPHOMORE = 'sophomore', 'Sophomore'
#     JUNIOR = 'junior', 'Junior'
#     SENIOR = 'senior', 'Senior'
    
# class StudentSchool(models.TextChoices):
#     SDSB = 'sdsb', 'SDSB'
#     MGHSS = 'mghss', 'MGHSS'
#     SBASSE = 'sbasse', 'SBASSE'
#     SAHSOL = 'sahsol', 'SAHSOL'
#     SOE = 'soe', 'SOE'
    
    
# class InstructorProfile(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE)
   
#     instructor_type = models.CharField(
#         max_length=20,
#         choices=InstructorType.choices,
#         default=InstructorType.UNDERGRADE
#     )
#     instructor_year = models.CharField(
#         max_length=20,
#         choices=StudentYear.choices,
#         default=StudentYear.SENIOR
#     )
#     instructor_school = models.CharField(
#         max_length=20,
#         choices=StudentSchool.choices,
#         default=StudentSchool.SDSB
#     )
    
#     cgpa = models.FloatField(
#         validators=[
#             MinValueValidator(0.0),
#             MaxValueValidator(4.0)
#         ]
#     )
    
    
    