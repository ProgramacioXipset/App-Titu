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

import com.example.demo.dto.Anada;
import com.example.demo.service.AnadaServiceIMPL;

@RestController
@CrossOrigin(origins = "*", methods= {RequestMethod.GET,RequestMethod.POST,RequestMethod.PUT,RequestMethod.DELETE})
public class AnadaController {
	@Autowired
	AnadaServiceIMPL AnadaServiceImpl;

	@GetMapping("/Anada")
	public List<Anada> listarAnadas() {
		return AnadaServiceImpl.listarAnada();
	}

	@PostMapping("/Anada")
	public Anada salvarAnada(@RequestBody Anada Anada) {

		return AnadaServiceImpl.guardarAnada(Anada);
	}

	@GetMapping("/Anada/{id}")
	public Anada AnadaXID(@PathVariable(name = "id") int Codigo) {

		Anada Anada_xid = new Anada();

		Anada_xid = AnadaServiceImpl.AnadaXID(Codigo);

		return Anada_xid;
	}

	@PutMapping("/Anada/{id}")
	public Anada actualizarAnada(@PathVariable(name = "id") int Codigo, @RequestBody Anada Anada) {

		Anada Anada_seleccionado = new Anada();
		Anada Anada_actualizado = new Anada();

		Anada_seleccionado = AnadaServiceImpl.AnadaXID(Codigo);

		Anada_seleccionado.setId(Anada.getId());
		Anada_seleccionado.setId_direccio_origen(Anada.getId_direccio_origen());
		Anada_seleccionado.setId_direccio_desti(Anada.getId_direccio_desti());
		Anada_seleccionado.setComentari(Anada.getComentari());
		Anada_seleccionado.setId_ruta(Anada.getId_ruta());
		Anada_seleccionado.setExterna(Anada.getExterna());

		Anada_actualizado = AnadaServiceImpl.actualizarAnada(Anada_seleccionado);

		return Anada_actualizado;
	}

	@DeleteMapping("/Anada/{id}")
	public void eliminarAnada(@PathVariable(name = "id") int Codigo) {
		AnadaServiceImpl.eliminarAnada(Codigo);
	}
}
