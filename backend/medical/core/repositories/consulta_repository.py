from core.models import Consulta, Paciente, Medico

class ConsultaRepository:
    def get_all(self):
        """Obtiene todas las consultas"""
        return Consulta.objects.all()

    def get_by_id(self, consulta_id):
        """Obtiene una consulta por ID"""
        return Consulta.objects.get(id=consulta_id)

    def create(self, data):
        """Crea una nueva consulta"""
        # Asegúrate de que los IDs de paciente y médico estén presentes en 'data'
        paciente = Paciente.objects.get(id=data['paciente'])
        medico = Medico.objects.get(id=data['medico'])

        # Creación de la consulta, ahora usando las instancias de paciente y médico
        consulta = Consulta.objects.create(
            paciente=paciente,
            medico=medico,
            fecha=data['fecha'],  # Utilizamos la clave 'fecha'
            estado=data.get('estado', 'pendiente'),  # Por defecto 'pendiente' si no está en 'data'
            diagnostico=data.get('diagnostico', '')
        )
        return consulta

    def update(self, consulta_id, data):
        """Actualiza una consulta existente"""
        consulta = self.get_by_id(consulta_id)

        # Actualizamos los campos de la consulta
        for key, value in data.items():
            setattr(consulta, key, value)
        consulta.save()
        return consulta

    def delete(self, consulta_id):
        """Elimina una consulta"""
        consulta = self.get_by_id(consulta_id)
        consulta.delete()

    def get_consultas_por_medico(self, medico_id):
        """Obtiene consultas de un médico"""
        return Consulta.objects.filter(medico_id=medico_id)

    def get_consultas_por_paciente(self, paciente_id):
        """Obtiene consultas de un paciente"""
        return Consulta.objects.filter(paciente_id=paciente_id)

    def get_consultas_pendientes(self):
        """Obtiene las consultas pendientes"""
        return Consulta.objects.filter(estado='pendiente')
