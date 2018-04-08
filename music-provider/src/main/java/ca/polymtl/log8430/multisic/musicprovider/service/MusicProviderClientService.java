package ca.polymtl.log8430.multisic.musicprovider.service;

import ca.polymtl.log8430.multisic.model.domain.TrackModel;
import ca.polymtl.log8430.multisic.musicprovider.service.provider.MusicProviderService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Service class for managing music providers.
 */
@Service
public class MusicProviderClientService {

    private final Logger log = LoggerFactory.getLogger(MusicProviderClientService.class);

    private final List<MusicProviderService> providers;

    public MusicProviderClientService(List<MusicProviderService> providers) {
        this.providers = providers;
    }

    public List<String> getAllMusicProviders() {
        return providers.stream()
            .map(MusicProviderService::getProviderName)
            .collect(Collectors.toList());
    }

    public List<TrackModel> search(String query, String providerName) {
        return providers.stream()
            .filter(p -> p.getProviderName().equals(providerName))
            .findFirst()
            .get()
            .search(query);
    }

}
