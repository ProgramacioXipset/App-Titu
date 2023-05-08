package com.example.demo.dto;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
@Entity
@Table(name= "xofer")
public class Xofer {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(name="nom")
	private String nom;
	
	@Column(name="cognoms")
	private String cognoms;
	
	@Column(name="telefon")
	private Integer telefon;
	
	@Column(name="email")
	private String email;
	
	@Column(name="dni")
	private String dni;

	@ManyToOne
	@JoinColumn(name = "id_camio")
    @JsonIgnoreProperties("xofer")
	Camio id_camio;
	
	@ManyToOne
	@JoinColumn(name = "id_remolc")
    @JsonIgnoreProperties("xofer")
	Remolc id_remolc;
	
	@OneToMany(mappedBy = "id_xofer", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("id_xofer")
	private List<Ruta> ruta;
	
	@OneToMany(mappedBy = "id_xofer", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("id_xofer")
	private List<XoferNoDisponible> xofer_no_disponible;

	public Xofer() {
		super();
	}

	public Xofer(int id, String nom, String cognoms, Integer telefon, String email, String dni, Camio id_camio,
			Remolc id_remolc, List<Ruta> ruta, List<XoferNoDisponible> xofer_no_disponible) {
		super();
		this.id = id;
		this.nom = nom;
		this.cognoms = cognoms;
		this.telefon = telefon;
		this.email = email;
		this.dni = dni;
		this.id_camio = id_camio;
		this.id_remolc = id_remolc;
		this.ruta = ruta;
		this.xofer_no_disponible = xofer_no_disponible;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public String getCognoms() {
		return cognoms;
	}

	public void setCognoms(String cognoms) {
		this.cognoms = cognoms;
	}

	public Integer getTelefon() {
		return telefon;
	}

	public void setTelefon(Integer telefon) {
		this.telefon = telefon;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getDni() {
		return dni;
	}

	public void setDni(String dni) {
		this.dni = dni;
	}

	public Camio getId_camio() {
		return id_camio;
	}

	public void setId_camio(Camio id_camio) {
		this.id_camio = id_camio;
	}

	public Remolc getId_remolc() {
		return id_remolc;
	}

	public void setId_remolc(Remolc id_remolc) {
		this.id_remolc = id_remolc;
	}

	public List<Ruta> getRuta() {
		return ruta;
	}

	public void setRuta(List<Ruta> ruta) {
		this.ruta = ruta;
	}

	public List<XoferNoDisponible> getXofer_no_disponible() {
		return xofer_no_disponible;
	}

	public void setXofer_no_disponible(List<XoferNoDisponible> xofer_no_disponible) {
		this.xofer_no_disponible = xofer_no_disponible;
	}

	@Override
	public String toString() {
		return "Xofer [id=" + id + ", nom=" + nom + ", cognoms=" + cognoms + ", telefon=" + telefon + ", email=" + email
				+ ", dni=" + dni + ", id_camio=" + id_camio + ", id_remolc=" + id_remolc + ", ruta=" + ruta
				+ ", xofer_no_disponible=" + xofer_no_disponible + "]";
	}
}
