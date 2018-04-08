package ca.polymtl.log8430.multisic.musicprovider.web.rest;

import com.codahale.metrics.annotation.Timed;

import ca.polymtl.log8430.multisic.model.domain.TrackModel;
import ca.polymtl.log8430.multisic.musicprovider.service.MusicProviderClientService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.*;

/**
 * REST controller for managing Music Provider API calls.
 * <p>
 * This class accesses the Music Provider entities, and needs to fetch their respective API.
 * </p>
 */
@RestController
@RequestMapping("/api")
public class MusicProviderResource {

    private final Logger log = LoggerFactory.getLogger(MusicProviderResource.class);

    private final MusicProviderClientService musicProviderClientService;

    public MusicProviderResource(MusicProviderClientService musicProviderService) {

        this.musicProviderClientService = musicProviderService;
    }

    /**
     * GET /music-providers : get all music providers.
     *
     * @return a string list of all the music providers
     */
    @GetMapping("/music-providers")
    @Timed
    public List<String> getAllMusicProviders() {
        return musicProviderClientService.getAllMusicProviders();
    }

    /**
     * GET /music-providers/search : get music corresponding to search query
     *
     * @return a list of Track
     */
    @GetMapping("/music-providers/search")
    @Timed
    public List<TrackModel> search(@RequestParam String query, @RequestParam String provider) {
        return musicProviderClientService.search(query, provider);
    }
}
