package com.example.demo.service;

import java.util.List;

import com.example.demo.dto.AvuiXAvui;

public interface IAvuiXAvuiService {

	public List<AvuiXAvui> listarAvuiXAvui(); 
	
	public AvuiXAvui guardarAvuiXAvui(AvuiXAvui AvuiXAvui);	
	
	public AvuiXAvui AvuiXAvuiXID(int id);
	
	public AvuiXAvui actualizarAvuiXAvui(AvuiXAvui AvuiXAvui); 
	
	public void eliminarAvuiXAvui(int id);
	
	
}
