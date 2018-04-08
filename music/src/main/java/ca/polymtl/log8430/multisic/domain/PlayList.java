package ca.polymtl.log8430.multisic.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;
import java.util.Objects;

/**
 * A PlayList.
 */
@Entity
@Table(name = "play_list")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class PlayList implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @JsonSerialize(using = ToStringSerializer.class)
    private Long id;

    @Column(name = "name")
    private String name;

    @ManyToMany(cascade = CascadeType.ALL)
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "play_list_track",
               joinColumns = @JoinColumn(name="play_lists_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="tracks_id", referencedColumnName="id"))
    private Set<Track> tracks = new HashSet<>();

    public PlayList() {
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

    public PlayList name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Track> getTracks() {
        return tracks;
    }

    public PlayList tracks(Set<Track> tracks) {
        this.tracks = tracks;
        return this;
    }

    public PlayList addTrack(Track track) {
        this.tracks.add(track);
        track.getPlaylists().add(this);
        return this;
    }

    public PlayList removeTrack(Track track) {
        this.tracks.remove(track);
        track.getPlaylists().remove(this);
        return this;
    }

    public void setTracks(Set<Track> tracks) {
        this.tracks = tracks;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        PlayList playList = (PlayList) o;
        if (playList.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), playList.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PlayList{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
