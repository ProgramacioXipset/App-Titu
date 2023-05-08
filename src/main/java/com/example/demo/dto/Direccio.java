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
@Table(name="direccio")
public class Direccio {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)//busca ultimo valor e incrementa desde id final de db
	private int id;
	
	@Column(name = "adreca")//no hace falta si se llama igual
	private String adreca;
	
	@Column(name = "poblacio")//no hace falta si se llama igual
	private String poblacio;
	
	@Column(name = "codi_postal")//no hace falta si se llama igual
	private int codi_postal;
	
	@OneToMany(mappedBy = "id_direccio_origen", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties({ "id_direccio_origen", "id_direccio_desti" })
	private List<Anada> anada;
	
	@OneToMany(mappedBy = "id_direccio_origen", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties({ "id_direccio_origen", "id_direccio_desti" })
	private List<Tornada> tornada;
	
	@OneToMany(mappedBy = "id_direccio_origen", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties({ "id_direccio_origen", "id_direccio_desti" })
	private List<AvuiXAvui> avui_x_avui;

	public Direccio() {
		super();
	}

	public Direccio(int id, String adreca, String poblacio, int codi_postal, List<Anada> anada, List<Tornada> tornada,
			List<AvuiXAvui> avui_x_avui) {
		super();
		this.id = id;
		this.adreca = adreca;
		this.poblacio = poblacio;
		this.codi_postal = codi_postal;
		this.anada = anada;
		this.tornada = tornada;
		this.avui_x_avui = avui_x_avui;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getAdreca() {
		return adreca;
	}

	public void setAdreca(String adreca) {
		this.adreca = adreca;
	}

	public String getPoblacio() {
		return poblacio;
	}

	public void setPoblacio(String poblacio) {
		this.poblacio = poblacio;
	}

	public int getCodi_postal() {
		return codi_postal;
	}

	public void setCodi_postal(int codi_postal) {
		this.codi_postal = codi_postal;
	}

	public List<Anada> getAnada() {
		return anada;
	}

	public void setAnada(List<Anada> anada) {
		this.anada = anada;
	}

	public List<Tornada> getTornada() {
		return tornada;
	}

	public void setTornada(List<Tornada> tornada) {
		this.tornada = tornada;
	}

	public List<AvuiXAvui> getAvui_x_avui() {
		return avui_x_avui;
	}

	public void setAvui_x_avui(List<AvuiXAvui> avui_x_avui) {
		this.avui_x_avui = avui_x_avui;
	}

	@Override
	public String toString() {
		return "Direccio [id=" + id + ", adreca=" + adreca + ", poblacio=" + poblacio + ", codi_postal=" + codi_postal
				+ ", anada=" + anada + ", tornada=" + tornada + ", avui_x_avui=" + avui_x_avui + "]";
	}
	
}
