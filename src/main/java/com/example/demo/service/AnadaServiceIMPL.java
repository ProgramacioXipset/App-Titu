package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dao.IAnadaDAO;
import com.example.demo.dto.Anada;

@Service
public class AnadaServiceIMPL implements IAnadaService {

	@Autowired
	IAnadaDAO iAnadaDAO;
	
	@Override
	public List<Anada> listarAnada() {
		// TODO Auto-generated method stub
		return iAnadaDAO.findAll();
	}

	@Override
	public Anada guardarAnada(Anada Anada) {
		// TODO Auto-generated method stub
		return iAnadaDAO.save(Anada);
	}

	@Override
	public Anada AnadaXID(int id) {
		// TODO Auto-generated method stub
		return iAnadaDAO.findById(id).get();
	}

	@Override
	public Anada actualizarAnada(Anada Anada) {
		// TODO Auto-generated method stub
		return iAnadaDAO.save(Anada);
	}

	@Override
	public void eliminarAnada(int id) {
		// TODO Auto-generated method stub
		iAnadaDAO.deleteById(id);
	}
	
}
