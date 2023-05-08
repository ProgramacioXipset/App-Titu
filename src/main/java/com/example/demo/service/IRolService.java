package com.example.demo.service;

import java.util.List;

import com.example.demo.dto.Rol;

public interface IRolService {

	public List<Rol> listarRol(); 
	
	public Rol guardarRol(Rol Rol);	
	
	public Rol RolXID(int id);
	
	public Rol actualizarRol(Rol Rol); 
	
	public void eliminarRol(int id);
	
	
}
