package com.example.demo.service;

import java.util.List;

import com.example.demo.dto.Tornada;

public interface ITornadaService {

	public List<Tornada> listarTornada(); 
	
	public Tornada guardarTornada(Tornada Tornada);	
	
	public Tornada TornadaXID(int id);
	
	public Tornada actualizarTornada(Tornada Tornada); 
	
	public void eliminarTornada(int id);
	
	
}
