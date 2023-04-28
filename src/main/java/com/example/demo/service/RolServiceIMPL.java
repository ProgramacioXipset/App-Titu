package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dao.IRolDAO;
import com.example.demo.dto.Rol;

@Service
public class RolServiceIMPL implements IRolService {

	@Autowired
	IRolDAO iRolDAO;
	
	@Override
	public List<Rol> listarRol() {
		// TODO Auto-generated method stub
		return iRolDAO.findAll();
	}

	@Override
	public Rol guardarRol(Rol Rol) {
		// TODO Auto-generated method stub
		return iRolDAO.save(Rol);
	}

	@Override
	public Rol RolXID(int id) {
		// TODO Auto-generated method stub
		return iRolDAO.findById(id).get();
	}

	@Override
	public Rol actualizarRol(Rol Rol) {
		// TODO Auto-generated method stub
		return iRolDAO.save(Rol);
	}

	@Override
	public void eliminarRol(int id) {
		// TODO Auto-generated method stub
		iRolDAO.deleteById(id);
	}

	
	
}
