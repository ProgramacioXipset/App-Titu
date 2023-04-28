package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dao.IAvuiXAvuiDAO;
import com.example.demo.dto.AvuiXAvui;

@Service
public class AvuiXAvuiServiceIMPL implements IAvuiXAvuiService {

	@Autowired
	IAvuiXAvuiDAO iAvuiXAvuiDAO;
	
	@Override
	public List<AvuiXAvui> listarAvuiXAvui() {
		// TODO Auto-generated method stub
		return iAvuiXAvuiDAO.findAll();
	}

	@Override
	public AvuiXAvui guardarAvuiXAvui(AvuiXAvui AvuiXAvui) {
		// TODO Auto-generated method stub
		return iAvuiXAvuiDAO.save(AvuiXAvui);
	}

	@Override
	public AvuiXAvui AvuiXAvuiXID(int id) {
		// TODO Auto-generated method stub
		return iAvuiXAvuiDAO.findById(id).get();
	}

	@Override
	public AvuiXAvui actualizarAvuiXAvui(AvuiXAvui AvuiXAvui) {
		// TODO Auto-generated method stub
		return iAvuiXAvuiDAO.save(AvuiXAvui);
	}

	@Override
	public void eliminarAvuiXAvui(int id) {
		// TODO Auto-generated method stub
		iAvuiXAvuiDAO.deleteById(id);
	}
	
}
