package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dao.IRemolcNoDisponibleDAO;
import com.example.demo.dto.RemolcNoDisponible;

@Service
public class RemolcNoDisponibleServiceIMPL implements IRemolcNoDisponibleService {

	@Autowired
	IRemolcNoDisponibleDAO iRemolcNoDisponibleDAO;
	
	@Override
	public List<RemolcNoDisponible> listarRemolcNoDisponible() {
		// TODO Auto-generated method stub
		return iRemolcNoDisponibleDAO.findAll();
	}

	@Override
	public RemolcNoDisponible guardarRemolcNoDisponible(RemolcNoDisponible RemolcNoDisponible) {
		// TODO Auto-generated method stub
		return iRemolcNoDisponibleDAO.save(RemolcNoDisponible);
	}

	@Override
	public RemolcNoDisponible RemolcNoDisponibleXID(int id) {
		// TODO Auto-generated method stub
		return iRemolcNoDisponibleDAO.findById(id).get();
	}

	@Override
	public RemolcNoDisponible actualizarRemolcNoDisponible(RemolcNoDisponible RemolcNoDisponible) {
		// TODO Auto-generated method stub
		return iRemolcNoDisponibleDAO.save(RemolcNoDisponible);
	}

	@Override
	public void eliminarRemolcNoDisponible(int id) {
		// TODO Auto-generated method stub
		iRemolcNoDisponibleDAO.deleteById(id);
	}
	
}
