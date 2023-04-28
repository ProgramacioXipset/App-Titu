package com.example.demo.service;

import java.util.List;

import com.example.demo.dto.Anada;

public interface IAnadaService {

	public List<Anada> listarAnada(); 
	
	public Anada guardarAnada(Anada Anada);	
	
	public Anada AnadaXID(int id);
	
	public Anada actualizarAnada(Anada Anada); 
	
	public void eliminarAnada(int id);
	
	
}
