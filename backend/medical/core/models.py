from django.db import models
from django.core.validators import MinLengthValidator

class Especialidad(models.Model):
    nombre = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.nombre


class Medico(models.Model):
    nombre = models.CharField(max_length=100)
    cedula_profesional = models.CharField(max_length=20, unique=True)
    especialidad = models.ForeignKey(Especialidad, on_delete=models.CASCADE)
    horario = models.CharField(max_length=100)  # Puedes estructurar esto mejor según el sistema de horarios

    def __str__(self):
        return self.nombre


class Paciente(models.Model):
    nombre = models.CharField(max_length=100)
    cedula = models.CharField(max_length=20, unique=True, validators=[MinLengthValidator(6)])
    telefono = models.CharField(max_length=15)
    correo = models.EmailField(unique=True)
    direccion = models.CharField(max_length=200, blank=True)

    def __str__(self):
        return self.nombre


class Consulta(models.Model):
    ESTADO_CHOICES = [
        ('pendiente', 'Pendiente'),
        ('realizada', 'Realizada'),
        ('cancelada', 'Cancelada'),
        ('inasistencia', 'Inasistencia'),
    ]

    paciente = models.ForeignKey(Paciente, on_delete=models.CASCADE)
    medico = models.ForeignKey(Medico, on_delete=models.CASCADE)
    fecha = models.DateTimeField()
    estado = models.CharField(max_length=20, choices=ESTADO_CHOICES, default='pendiente')
    diagnostico = models.TextField(blank=True)

    def __str__(self):
        return f'Consulta {self.id} - {self.paciente} - {self.medico}'


class Inasistencia(models.Model):
    paciente = models.ForeignKey(Paciente, on_delete=models.CASCADE)
    consulta = models.OneToOneField(Consulta, on_delete=models.CASCADE)
    fecha = models.DateField(auto_now_add=True)
    motivo = models.TextField(blank=True)

    def __str__(self):
        return f'Inasistencia: {self.paciente} en {self.consulta}'
