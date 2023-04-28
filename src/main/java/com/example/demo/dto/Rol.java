package com.example.demo.dto;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name="rol")
public class Rol {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)//busca ultimo valor e incrementa desde id final de db
	private int id;
	
	@Column(name = "nom_rol")//no hace falta si se llama igual
	private String nom_rol;
	
	@OneToMany(mappedBy = "id_rol", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("id_rol")
	private List<Usuari> usuari;

	public Rol() {
		super();
	}

	public Rol(int id, String nom_rol, List<Usuari> usuari) {
		super();
		this.id = id;
		this.nom_rol = nom_rol;
		this.usuari = usuari;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getNom_rol() {
		return nom_rol;
	}

	public void setNom_rol(String nom_rol) {
		this.nom_rol = nom_rol;
	}

	public List<Usuari> getUsuari() {
		return usuari;
	}

	public void setUsuari(List<Usuari> usuari) {
		this.usuari = usuari;
	}

	@Override
	public String toString() {
		return "Rol [id=" + id + ", nom_rol=" + nom_rol + ", usuari=" + usuari + "]";
	}
	
}
