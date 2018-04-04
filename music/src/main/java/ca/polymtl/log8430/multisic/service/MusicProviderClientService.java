package ca.polymtl.log8430.multisic.service;

import ca.polymtl.log8430.multisic.domain.Track;
import ca.polymtl.log8430.multisic.service.musicprovider.MusicProviderService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

/**
 * Service class for managing music providers.
 */
@Service
@Transactional
public class MusicProviderClientService {

    private final Logger log = LoggerFactory.getLogger(MusicProviderClientService.class);

    private final List<MusicProviderService> providers;

    public MusicProviderClientService(List<MusicProviderService> providers) {
        this.providers = providers;
    }

    @Transactional(readOnly = true)
    public List<String> getAllMusicProviders() {
        return providers.stream()
            .map(MusicProviderService::getProviderName)
            .collect(Collectors.toList());
    }

    public List<Track> search(String query, String providerName) {
        return providers.stream()
            .filter(p -> p.getProviderName().equals(providerName))
            .findFirst()
            .get()
            .search(query);
    }


}
