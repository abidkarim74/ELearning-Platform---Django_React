from django.db import models
from authentication.models import User
from user_profiles.models import StudentProfile


# class Subject(models.Model):
#     name = models.CharField(max_length=50)
    
#     def __str__ (self):
#         return self.name.title()
    
    
# class FullCourse(models.Model):
#     subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
#     name = models.CharField(max_length=150)
#     coourse_count = models.PositiveIntegerField()
    
#     def __str__ (self):
#         return self.name.title()
    

# class Course(models.Model):
#     instructor = models.ForeignKey(InstructorProfile, on_delete=models.CASCADE)
#     full_course = models.ForeignKey(FullCourse, on_delete=models.CASCADE)
#     capacity = models.PositiveIntegerField()
#     enrolled_students = models.ManyToManyField(StudentProfile)
    
#     def __str__ (self):
#         return f'{self.subject.name.title()} offered by {self.instructor.user.first_name.title()} {self.instructor.user.last_name()}'
    
    
    
    
    