package ca.polymtl.log8430.multisic.musicprovider.service.provider;

import ca.polymtl.log8430.multisic.model.domain.TrackModel;

/**
 * This interface refer to the required method to transform Track to our own model
 *
 * @param <F> Track in the provider model
 */
public interface TrackTransformer<F> {

	/**
	 * Transform provider track to our own model
	 *
	 * @param fromTrack Track in the provider model
	 * @return Track in our own model
	 */
	TrackModel transform(F fromTrack);
}
