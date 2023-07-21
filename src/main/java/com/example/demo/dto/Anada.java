package com.example.demo.dto;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name="anada")
public class Anada {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)//Anada ultimo valor e incrementa desde id final de db
	private int id;
	
	@ManyToOne
	@JoinColumn(name = "id_direccio_origen")
    @JsonIgnoreProperties({ "anada", "tornada", "avui_x_avui" })
	Direccio id_direccio_origen;
	
	@ManyToOne
	@JoinColumn(name = "id_direccio_desti")
    @JsonIgnoreProperties({ "anada", "tornada", "avui_x_avui" })
	Direccio id_direccio_desti;
	
	@Column(name = "comentari")//no hace falta si se llama igual
	private String comentari;
	
	@ManyToOne
	@JoinColumn(name = "id_ruta")
    @JsonIgnoreProperties({ "anada", "tornada", "avui_x_avui" })
	Ruta id_ruta;
	
	@Column(name = "externa")//no hace falta si se llama igual
	private Integer externa;

	public Anada() {
		super();
	}

	public Anada(int id, Direccio id_direccio_origen, Direccio id_direccio_desti, String comentari, Ruta id_ruta, Integer externa) {
		super();
		this.id = id;
		this.id_direccio_origen = id_direccio_origen;
		this.id_direccio_desti = id_direccio_desti;
		this.comentari = comentari;
		this.id_ruta = id_ruta;
		this.externa = externa;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Direccio getId_direccio_origen() {
		return id_direccio_origen;
	}

	public void setId_direccio_origen(Direccio id_direccio_origen) {
		this.id_direccio_origen = id_direccio_origen;
	}

	public Direccio getId_direccio_desti() {
		return id_direccio_desti;
	}

	public void setId_direccio_desti(Direccio id_direccio_desti) {
		this.id_direccio_desti = id_direccio_desti;
	}

	public String getComentari() {
		return comentari;
	}

	public void setComentari(String comentari) {
		this.comentari = comentari;
	}

	public Ruta getId_ruta() {
		return id_ruta;
	}

	public void setId_ruta(Ruta id_ruta) {
		this.id_ruta = id_ruta;
	}
	
	public Integer getExterna() {
		return externa;
	}

	public void setExterna(Integer externa) {
		this.externa = externa;
	}

	@Override
	public String toString() {
		return "Anada [id=" + id + ", id_direccio_origen=" + id_direccio_origen + ", id_direccio_desti="
				+ id_direccio_desti + ", comentari=" + comentari + ", id_ruta=" + id_ruta + ", externa=" + externa
				+ "]";
	}
}
