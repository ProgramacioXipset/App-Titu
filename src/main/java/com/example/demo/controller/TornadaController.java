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

import com.example.demo.dto.Tornada;
import com.example.demo.service.TornadaServiceIMPL;

@RestController
@CrossOrigin(origins = "*", methods= {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class TornadaController {
	
	@Autowired
	TornadaServiceIMPL TornadaServiceImpl;

	@GetMapping("/Tornada")
	public List<Tornada> listarTornadas() {
		return TornadaServiceImpl.listarTornada();
	}

	@PostMapping("/Tornada")
	public Tornada salvarTornada(@RequestBody Tornada Tornada) {

		return TornadaServiceImpl.guardarTornada(Tornada);
	}

	@GetMapping("/Tornada/{id}")
	public Tornada TornadaXID(@PathVariable(name = "id") int Codigo) {

		Tornada Tornada_xid = new Tornada();

		Tornada_xid = TornadaServiceImpl.TornadaXID(Codigo);

		return Tornada_xid;
	}

	@PutMapping("/Tornada/{id}")
	public Tornada actualizarTornada(@PathVariable(name = "id") int Codigo, @RequestBody Tornada Tornada) {

		Tornada Tornada_seleccionado = new Tornada();
		Tornada Tornada_actualizado = new Tornada();

		Tornada_seleccionado = TornadaServiceImpl.TornadaXID(Codigo);

		Tornada_seleccionado.setId(Tornada.getId());
		Tornada_seleccionado.setId_direccio_origen(Tornada.getId_direccio_origen());
		Tornada_seleccionado.setId_direccio_desti(Tornada.getId_direccio_desti());
		Tornada_seleccionado.setComentari(Tornada.getComentari());
		Tornada_seleccionado.setId_ruta(Tornada.getId_ruta());
		Tornada_seleccionado.setExterna(Tornada.getExterna());


		Tornada_actualizado = TornadaServiceImpl.actualizarTornada(Tornada_seleccionado);

		return Tornada_actualizado;
	}

	@DeleteMapping("/Tornada/{id}")
	public void eliminarTornada(@PathVariable(name = "id") int Codigo) {
		TornadaServiceImpl.eliminarTornada(Codigo);
	}
}
