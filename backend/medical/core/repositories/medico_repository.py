from core.models import Medico, Especialidad


class MedicoRepository:
    def get_all(self):
        """Obtiene todos los médicos"""
        return Medico.objects.all()

    def get_by_id(self, id):
        """Obtiene un médico por su ID"""
        return Medico.objects.get(id=id)

    def create(self, data):
        """Crea un nuevo médico"""
        try:
            especialidad = Especialidad.objects.get(id=data['especialidad'])
        except Especialidad.DoesNotExist:
            raise ValueError(f"No existe una especialidad con ID {data['especialidad']}")

        medico = Medico(
            nombre=data['nombre'],
            cedula_profesional=data['cedula_profesional'],
            especialidad=especialidad,
            horario=data['horario']
        )
        medico.save()
        return medico

    def update(self, medico, nombre=None, cedula_profesional=None, especialidad=None, horario=None):
        """Actualiza un médico"""
        if nombre:
            medico.nombre = nombre
        if cedula_profesional:
            medico.cedula_profesional = cedula_profesional
        if especialidad:
            try:
                especialidad_instance = Especialidad.objects.get(id=especialidad)
                medico.especialidad = especialidad_instance
            except Especialidad.DoesNotExist:
                raise ValueError(f"No existe una especialidad con ID {especialidad}")
        if horario:
            medico.horario = horario
        medico.save()
        return medico

    def delete(self, pk):
        """Elimina un médico por su ID"""
        try:
            medico = Medico.objects.get(pk=pk)
            medico.delete()
            return True
        except Medico.DoesNotExist:
            return False
