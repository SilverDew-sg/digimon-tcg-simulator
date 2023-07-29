package com.github.wekaito.backend;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.ExchangeStrategies;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final DeckRepo deckRepo;

    private final IdService idService;

    private final WebClient webClient = WebClient.builder()
            .baseUrl("https://digimoncard.io/api-public")
            .exchangeStrategies(ExchangeStrategies.builder()
                    .codecs(configurer -> configurer
                            .defaultCodecs()
                            .maxInMemorySize(1024 * 1024 * 10))
                    .build())
            .build();

    Card[] fetchCards(Optional<String> name, Optional<String> color, Optional<String> type) {
        ResponseEntity<Card[]> response = webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/search.php")
                        .queryParam("sort", "name")
                        .queryParam("series", "Digimon Card Game")
                        .queryParamIfPresent("n", name)
                        .queryParamIfPresent("color", color)
                        .queryParamIfPresent("type", type)
                        .build())
                .retrieve()
                .toEntity(Card[].class)
                .block();
        return Objects.requireNonNull(response).getBody();
    }

    public void addDeck(DeckWithoutId deckWithoutId) {
        Deck deckToSave = new Deck(
                idService.createId(),
                deckWithoutId.name(),
                deckWithoutId.cards(),
                deckWithoutId.deckStatus()
        );
        this.deckRepo.save(deckToSave);
    }

    public Deck[] getDecks() {
        return this.deckRepo.findAll().toArray(new Deck[0]);
    }

    public void updateDeck(String id, DeckWithoutId deckWithoutId) {
        Deck deckToSave = new Deck(
                id,
                deckWithoutId.name(),
                deckWithoutId.cards(),
                deckWithoutId.deckStatus()
        );
        this.deckRepo.save(deckToSave);
    }

    public Deck getDeckById(String id) {
        return this.deckRepo.findById(id).orElseThrow();
    }
}
