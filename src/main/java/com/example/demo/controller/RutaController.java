package com.example.demo.controller;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.dto.Anada;
import com.example.demo.dto.AvuiXAvui;
import com.example.demo.dto.Ruta;
import com.example.demo.dto.Tornada;
import com.example.demo.service.RutaServiceIMPL;

@RestController
@CrossOrigin(origins = "*", methods= {RequestMethod.GET,RequestMethod.POST,RequestMethod.PUT,RequestMethod.DELETE})
public class RutaController {

	@Autowired
	RutaServiceIMPL RutaServiceImpl;

	@GetMapping("/Ruta")
	public List<Ruta> listarRutas() {
		return RutaServiceImpl.listarRuta();
	}

	@PostMapping("/Ruta")
	public Ruta salvarRuta(@RequestBody Ruta Ruta) {

		return RutaServiceImpl.guardarRuta(Ruta);
	}

	@GetMapping("/Ruta/{id}")
	public Ruta RutaXID(@PathVariable(name = "id") int Codigo) {

		Ruta Ruta_xid = new Ruta();

		Ruta_xid = RutaServiceImpl.RutaXID(Codigo);

		return Ruta_xid;

	}

	@PutMapping("/Ruta/{id}")
	public Ruta actualizarRuta(@PathVariable(name = "id") int Codigo, @RequestBody Ruta Ruta) {

		Ruta Ruta_seleccionado = new Ruta();
		Ruta Ruta_actualizado = new Ruta();

		Ruta_seleccionado = RutaServiceImpl.RutaXID(Codigo);

		Ruta_seleccionado.setId(Ruta.getId());
		Ruta_seleccionado.setId_xofer(Ruta.getId_xofer());

		Ruta_actualizado = RutaServiceImpl.actualizarRuta(Ruta_seleccionado);

		return Ruta_actualizado;
	}

	@DeleteMapping("/Ruta/{id}")
	public void eliminarRuta(@PathVariable(name = "id") int Codigo) {
		Ruta ruta = RutaServiceImpl.RutaXID(Codigo);
		
		List<AvuiXAvui> avuiXAvuis = ruta.getAvui_x_avui();
		List<Anada> anades = ruta.getAnada();
		List<Tornada> tornades = ruta.getTornada();
		
		for (AvuiXAvui avuiXAvui : avuiXAvuis) {
			avuiXAvui.setId_ruta(null);
		}
		
		for (Anada anada : anades) {
			anada.setId_ruta(null);
		}
		
		for (Tornada tornada : tornades) {
			tornada.setId_ruta(null);
		}
		
		RutaServiceImpl.eliminarRuta(Codigo);
	}
}
