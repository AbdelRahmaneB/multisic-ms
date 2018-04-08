package ca.polymtl.log8430.multisic.musicprovider.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;
import java.util.Objects;

/**
 * A Track.
 */
public class Track2 implements Serializable {

    private static final long serialVersionUID = 1L;

    @JsonSerialize(using = ToStringSerializer.class)
    private Long id;

    private String name;

    private String album;

    private String artist;

    private String imagesurl;

    private String previewurl;
    
    public Track2() {
        this.id = UUID.randomUUID().getMostSignificantBits() & Long.MAX_VALUE;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Track2 name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAlbum() {
        return album;
    }

    public Track2 album(String album) {
        this.album = album;
        return this;
    }

    public void setAlbum(String album) {
        this.album = album;
    }

    public String getArtist() {
        return artist;
    }

    public Track2 artist(String artist) {
        this.artist = artist;
        return this;
    }

    public void setArtist(String artist) {
        this.artist = artist;
    }

    public String getImagesurl() {
        return imagesurl;
    }

    public Track2 imagesurl(String imagesurl) {
        this.imagesurl = imagesurl;
        return this;
    }

    public void setImagesurl(String imagesurl) {
        this.imagesurl = imagesurl;
    }

    public String getPreviewurl() {
        return previewurl;
    }

    public Track2 previewurl(String previewurl) {
        this.previewurl = previewurl;
        return this;
    }

    public void setPreviewurl(String previewurl) {
        this.previewurl = previewurl;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Track2 track = (Track2) o;
        if (track.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), track.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Track{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", album='" + getAlbum() + "'" +
            ", artist='" + getArtist() + "'" +
            ", imagesurl='" + getImagesurl() + "'" +
            ", previewurl='" + getPreviewurl() + "'" +
            "}";
    }
}
