package com.example.demo.dto;

import java.sql.Date;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


@Entity
@Table(name="camio_no_disponible")
public class CamioNoDisponible {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)//busca ultimo valor e incrementa desde id final de db
	private int id;
	
    @ManyToOne
    @JoinColumn(name = "id_camio")
    @JsonIgnoreProperties("camio_no_disponible")
	Camio camio;
	
	@Column(name = "dia")//no hace falta si se llama igual
	private Date dia;

	public CamioNoDisponible() {
		super();
	}

	public CamioNoDisponible(int id, Camio camio, Date dia) {
		super();
		this.id = id;
		this.camio = camio;
		this.dia = dia;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Camio getCamio() {
		return camio;
	}

	public void setCamio(Camio camio) {
		this.camio = camio;
	}

	public Date getDia() {
		return dia;
	}

	public void setDia(Date dia) {
		this.dia = dia;
	}

	@Override
	public String toString() {
		return "CamioNoDisponible [id=" + id + ", camio=" + camio + ", dia=" + dia + "]";
	}
	
}
