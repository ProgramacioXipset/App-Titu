package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dao.ITornadaDAO;
import com.example.demo.dto.Tornada;


@Service
public class TornadaServiceIMPL implements ITornadaService {
	@Autowired
	ITornadaDAO iTornadaDAO;
	
	@Override
	public List<Tornada> listarTornada() {
		// TODO Auto-generated method stub
		return iTornadaDAO.findAll();
	}

	@Override
	public Tornada guardarTornada(Tornada Tornada) {
		// TODO Auto-generated method stub
		return iTornadaDAO.save(Tornada);
	}

	@Override
	public Tornada TornadaXID(int id) {
		// TODO Auto-generated method stub
		return iTornadaDAO.findById(id).get();
	}

	@Override
	public Tornada actualizarTornada(Tornada Tornada) {
		// TODO Auto-generated method stub
		return iTornadaDAO.save(Tornada);
	}

	@Override
	public void eliminarTornada(int id) {
		// TODO Auto-generated method stub
		iTornadaDAO.deleteById(id);
	}

}
