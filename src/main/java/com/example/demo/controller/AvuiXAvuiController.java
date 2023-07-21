package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.dto.AvuiXAvui;
import com.example.demo.service.AvuiXAvuiServiceIMPL;

@RestController
@CrossOrigin(origins = "*", methods= {RequestMethod.GET,RequestMethod.POST,RequestMethod.PUT,RequestMethod.DELETE})
public class AvuiXAvuiController {

	@Autowired
	AvuiXAvuiServiceIMPL AvuiXAvuiServiceImpl;

	@GetMapping("/AvuiXAvui")
	public List<AvuiXAvui> listarAvuiXAvuis() {
		return AvuiXAvuiServiceImpl.listarAvuiXAvui();
	}

	@PostMapping("/AvuiXAvui")
	public AvuiXAvui salvarAvuiXAvui(@RequestBody AvuiXAvui AvuiXAvui) {

		return AvuiXAvuiServiceImpl.guardarAvuiXAvui(AvuiXAvui);
	}

	@GetMapping("/AvuiXAvui/{id}")
	public AvuiXAvui AvuiXAvuiXID(@PathVariable(name = "id") int Codigo) {

		AvuiXAvui AvuiXAvui_xid = new AvuiXAvui();

		AvuiXAvui_xid = AvuiXAvuiServiceImpl.AvuiXAvuiXID(Codigo);

		return AvuiXAvui_xid;
	}

	@PutMapping("/AvuiXAvui/{id}")
	public AvuiXAvui actualizarAvuiXAvui(@PathVariable(name = "id") int Codigo, @RequestBody AvuiXAvui AvuiXAvui) {

		AvuiXAvui AvuiXAvui_seleccionado = new AvuiXAvui();
		AvuiXAvui AvuiXAvui_actualizado = new AvuiXAvui();

		AvuiXAvui_seleccionado = AvuiXAvuiServiceImpl.AvuiXAvuiXID(Codigo);

		AvuiXAvui_seleccionado.setId(AvuiXAvui.getId());
		AvuiXAvui_seleccionado.setId_direccio_origen(AvuiXAvui.getId_direccio_origen());
		AvuiXAvui_seleccionado.setId_direccio_desti(AvuiXAvui.getId_direccio_desti());
		AvuiXAvui_seleccionado.setComentari(AvuiXAvui.getComentari());
		AvuiXAvui_seleccionado.setId_ruta(AvuiXAvui.getId_ruta());
		AvuiXAvui_seleccionado.setExterna(AvuiXAvui.getExterna());


		AvuiXAvui_actualizado = AvuiXAvuiServiceImpl.actualizarAvuiXAvui(AvuiXAvui_seleccionado);

		return AvuiXAvui_actualizado;
	}

	@DeleteMapping("/AvuiXAvui/{id}")
	public void eliminarAvuiXAvui(@PathVariable(name = "id") int Codigo) {
		AvuiXAvuiServiceImpl.eliminarAvuiXAvui(Codigo);
	}
	
}
