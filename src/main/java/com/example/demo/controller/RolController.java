package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.Rol;
import com.example.demo.service.RolServiceIMPL;

@RestController
@CrossOrigin(origins = "*", methods= {RequestMethod.GET,RequestMethod.POST,RequestMethod.PUT,RequestMethod.DELETE})
public class RolController {

	@Autowired
	RolServiceIMPL RolServiceImpl;

	@GetMapping("/Rol")
	public List<Rol> listarRols() {
		return RolServiceImpl.listarRol();
	}

	@PostMapping("/Rol")
	public Rol salvarRol(@RequestBody Rol Rol) {

		return RolServiceImpl.guardarRol(Rol);
	}

	@GetMapping("/Rol/{id}")
	public Rol RolXID(@PathVariable(name = "id") int Codigo) {

		Rol Rol_xid = new Rol();

		Rol_xid = RolServiceImpl.RolXID(Codigo);

		return Rol_xid;
	}

	@PutMapping("/Rol/{id}")
	public Rol actualizarRol(@PathVariable(name = "id") int Codigo, @RequestBody Rol Rol) {

		Rol Rol_seleccionado = new Rol();
		Rol Rol_actualizado = new Rol();

		Rol_seleccionado = RolServiceImpl.RolXID(Codigo);

		Rol_seleccionado.setId(Rol.getId());
		Rol_seleccionado.setNom_rol(Rol.getNom_rol());

		Rol_actualizado = RolServiceImpl.actualizarRol(Rol_seleccionado);

		return Rol_actualizado;
	}

	@DeleteMapping("/Rol/{id}")
	public void eliminarRol(@PathVariable(name = "id") int Codigo) {
		RolServiceImpl.eliminarRol(Codigo);
	}
	
}
