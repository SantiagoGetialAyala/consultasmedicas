from core.models import Paciente

class PacienteRepository:
    def get_all(self):
        """Obtiene todos los pacientes"""
        return Paciente.objects.all()

    def get_by_id(self, paciente_id):
        """Obtiene un paciente por ID"""
        return Paciente.objects.get(id=paciente_id)

    def create(self, data):
        """Crea un nuevo paciente"""
        return Paciente.objects.create(**data)

    def update(self, paciente_id, data):
        """Actualiza un paciente existente"""
        paciente = self.get_by_id(paciente_id)
        for key, value in data.items():
            setattr(paciente, key, value)
        paciente.save()

    def delete(self, paciente_id):
        """Elimina un paciente"""
        paciente = self.get_by_id(paciente_id)
        paciente.delete()
